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

  const mockLabels = [
    {
      id: 1,
      labelName: "🏠 Family",
      color:
        "text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100",
    },
    {
      id: 2,
      labelName: "💼 Work",
      color:
        "text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700",
    },
    {
      id: 3,
      labelName: "👋 Friend",
      color:
        "text-orange-600 bg-orange-100 rounded-full dark:bg-orange-600 dark:text-orange-100",
    },
  ];

  if (!labels || labels.length === 0) {
    saveLabels(mockLabels);
    return mockLabels;
  }

  return labels;
}
