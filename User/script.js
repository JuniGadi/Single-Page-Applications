function doGet(e) {
  return HtmlService.createHtmlOutputFromFile("input");
}

function submitForm(data) {
  var sheet = SpreadsheetApp.openById(
    "1tD_QUMpgICxniLEwNiGrd42ThPCXWGj5qMpZy5McxXQ"
  ).getSheetByName("Data");

  var phoneNumbers = sheet
    .getRange("B2:B" + sheet.getLastRow())
    .getValues()
    .flat() // Flatten the 2D array
    .map(String) // Ensure all values are strings for comparison
    .map((phone) => phone.trim()); // Remove any leading/trailing spaces

  // Check if the phone number already exists
  if (phoneNumbers.includes(String(data.phone).trim())) {
    return "You are already registered!";
  } else {
    // Append the new row if the phone number is not found
    sheet.appendRow([data.name, data.phone, data.location]);
    return "You are registered!";
  }
}
