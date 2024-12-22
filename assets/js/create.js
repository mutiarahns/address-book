const addContactFormElement = document.getElementById("add-contact-form");
const labelCheckboxElement = document.getElementById("label-checkbox");

function renderLabels() {
  const labels = loadLabels();

  labelCheckboxElement.innerHTML = "";
  labelCheckboxElement.innerHTML = labels
    .map((label) => {
      return `
    <label>
        <input
            class="sr-only peer"
            name="label"
            type="checkbox"
            value="${label.id}"
        />
        <div
            class="px-6 py-2 rounded-full border border-2 flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white"
        >
            ${label.labelName}
        </div>
    </label>
    `;
    })
    .join("");
}

function generateId() {
  const contacts = loadContacts();
  const totalContact = contacts.length;
  return totalContact === 0 ? 1 : contacts[totalContact - 1].id + 1 || 1;
}

window.addEventListener("load", renderLabels);

addContactFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(addContactFormElement);
  const storedContacts = loadContacts();

  const newContactData = {
    id: generateId(),
    name: formData.get("full-name"),
    isFavorited: Boolean(formData.get("favorite")),
    labels: formData.getAll("label").map((label) => parseInt(label)),
    createdAt: new Date(),
    birthdate: !formData.get("birthdate")
      ? null
      : new Date(formData.get("birthdate")),
    email: formData.get("email"),
    phone: formData.get("phone-number"),
    address: formData.get("address"),
  };

  const contacts = [...storedContacts, newContactData];

  saveContacts(contacts);
  window.location.href = "/";
});
