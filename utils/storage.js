import supabase from "../services/supabase";
import * as FileSystem from "expo-file-system";

// Function to upload image and store complaint data
const uploadComplaint = async (userId, imageUri, description, issueType, severity, location) => {
  try {
    const fileName = `complaint_${Date.now()}.jpg`;
    const fileExt = imageUri.split(".").pop();

    // Read file as a blob (binary large object)
    const fileData = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const filePath = `uploads/${fileName}`;

    // Upload the image to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from("complaint-images") // Your storage bucket name
      .upload(filePath, Buffer.from(fileData, "base64"), {
        contentType: `image/${fileExt}`,
      });

    if (uploadError) throw uploadError;

    // Get public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from("complaint-images")
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;
    console.log("✅ Image uploaded successfully:", imageUrl);

    // Insert complaint details into the complaints table
    const { error: dbError } = await supabase.from("complaints").insert([
      {
        user_id: userId, // Associate the complaint with the logged-in user
        description: description,
        image_url: imageUrl, // Store image URL in the table
        issue_type: issueType,
        severity: severity,
        location: location,
      },
    ]);

    if (dbError) throw dbError;

    console.log("✅ Complaint successfully stored in the database");
    return { success: true, imageUrl };
  } catch (error) {
    console.error("❌ Error:", error.message);
    return { success: false, error: error.message };
  }
};

export { uploadComplaint };
