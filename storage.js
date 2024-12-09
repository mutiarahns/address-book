function loadContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts"));
  return contacts || [];
}

function saveContacts(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadLabels() {
  const labels = JSON.parse(localStorage.getItem("labels"));
  return labels || [];
}

function saveLabels(labels) {
  localStorage.setItem("labels", JSON.stringify(labels));
}
