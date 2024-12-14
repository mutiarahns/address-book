function loadContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts"));

  if (!contacts) {
    saveContacts([]);
  }

  return contacts || [];
}

function saveContacts(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function saveLabels(labels) {
  localStorage.setItem("labels", JSON.stringify(labels));
}

function loadLabels() {
  const labels = JSON.parse(localStorage.getItem("labels"));

  if (!labels) {
    saveLabels([]);
  }

  return labels || [];
}
