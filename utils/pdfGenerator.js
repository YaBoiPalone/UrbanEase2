//import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

export const generatePDF = async (description, imageUrl, issueType, severity, location) => {
  const html = `
    <html>
      <body>
        <h1>Complaint Report</h1>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Issue Type:</strong> ${issueType}</p>
        <p><strong>Severity:</strong> ${severity}</p>
        <p><strong>Location:</strong> ${location}</p>
        <img src="${imageUrl}" width="100%" />
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  return uri;
};
