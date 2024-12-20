const labelsCheckboxElement = document.getElementById("label-checkbox");
const addContactFormElement = document.getElementById("add-contact-form");

function renderLabels() {
  const labels = loadLabels();

  labelsCheckboxElement.innerHTML = "";
  labelsCheckboxElement.innerHTML = labels
    .map(
      (label) => `
    <label for="label-${label.labelName.toLocaleLowerCase()}" class="flex items-center dark:text-gray-400">
        <input
            id="label-${label.labelName.toLocaleLowerCase()}"
            value="${label.id}"
            type="checkbox"
            class="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
        />
        <span class="ml-2"> ${label.labelName} </span>
    </label>
  `
    )
    .join("");
}

function generateId(contacts) {
  const totalContact = contacts.length === 0 ? 1 : contacts.length;
  return contacts.length === 0 ? 0 : contacts[totalContact - 1].id + 1 || 0;
}

function addContact(event) {
  event.preventDefault();

  const storedlabels = loadLabels();
  const storedContacts = loadContacts();

  const name = addContactFormElement.name.value;
  const email = addContactFormElement.email.value;
  const phone = addContactFormElement.phone.value;
  const address = addContactFormElement.address.value;
  const labels = storedlabels
    .map((label) =>
      document.getElementById(`label-${label.labelName.toLocaleLowerCase()}`)
    )
    .filter((label) => label.checked);

  const newContact = {
    id: generateId(storedContacts),
    name,
    email,
    phone,
    address,
    labels: labels.map((item) => parseInt(item.value)),
    deletedAt: null,
    isDeleted: false,
    isFavorited: false,
  };

  const newContacts = [...storedContacts, newContact];

  saveContacts(newContacts);

  window.location.href = "/";
}

window.addEventListener("load", renderLabels);
window.addEventListener("submit", addContact);
