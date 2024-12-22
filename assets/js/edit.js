const editContactContainerElement = document.getElementById(
  "edit-contact-container"
);

function getCurrentContactId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get("id");
}

function loadContactById(id) {
  const contacts = loadContacts();

  return contacts.find((contact) => contact.id == id);
}

function renderEditContactForm() {
  const id = getCurrentContactId();
  const contact = loadContactById(id);

  if (!contact) {
    alert("Contact not found");
    return;
  }

  editContactContainerElement.innerHTML = "";
  editContactContainerElement.innerHTML = `
    <form
        id="edit-contact-form"
        role="form"
        method="post"
        class="w-full max-w-lg"
    >
        <div class="flex flex-wrap -mx-3 mb-6 mt-6">
        <div class="relative w-full px-2 mb-10">
            <label class="absolute top-0 right-2">
            <input
                class="sr-only peer"
                name="favorite"
                type="checkbox"
                value="${contact.isFavorited}"
                ${contact.isFavorited ? "checked" : ""}
            />
            <div
                class="px-3 py-3 rounded-full flex items-center justify-center text-white bg-slate-300 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white"
            >
                <i class="fa-solid fa-heart"></i>
            </div>
            </label>
        </div>

        <div class="w-full px-3">
            <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="name"
            >
            Full Name*
            </label>
            <input
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            id="name"
            name="full-name"
            type="text"
            placeholder="Jane Doe"
            required
            value="${contact.name}"
            />
        </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="email"
            >
            Email*
            </label>
            <input
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            id="email"
            name="email"
            type="email"
            placeholder="janedoe@gmail.com"
            required
            value="${contact.email}"
            />
        </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="phone-number"
            >
            Phone Number*
            </label>
            <input
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            id="phone-number"
            name="phone-number"
            type="tel"
            placeholder="0812345678"
            required
            value="${contact.phone}"
            />
        </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="birthdate"
            >
            Birthdate
            </label>
            <input
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            id="birthdate"
            name="birthdate"
            type="date"
            value="${new Date(contact.birthdate).toISOString().split("T")[0]}"
            />
        </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="address"
            >
            Address
            </label>
            <textarea
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            id="address"
            name="address"
            type="text"
            placeholder="Sesame Street, Jakarta"
            rows="4"
            ></textarea>
        </div>
        </div>

        <label
        class="block text-gray-700 text-sm font-semibold mb-2"
        for="phone-number"
        >
        Labels (Optional)
        </label>

        <div
        class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"
        >
        <div id="label-checkbox" class="space-x-2 flex text-sm">
            <!-- Labels -->
            ${renderLabels(contact.labels || [])}
        </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <button
            class="bg-gray-100 w-full hover:bg-gray-50 text-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            <a
                class="inline-flex items-center justify-center w-full text-sm font-semibold transition-colors duration-150"
                href="/"
            >
                Cancel
            </a>
            </button>
        </div>
        <div class="w-full md:w-1/2 px-3">
            <button
            class="inline-flex items-center justify-center w-full hover:bg-slate-500 group flex items-center rounded-md bg-slate-900 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
            type="submit"
            >
            Save
            </button>
        </div>
        </div>
    </form>
    `;

  document.getElementById("address").value = contact.address;
  const editContactFormElement = document.getElementById("edit-contact-form");

  editContactFormElement.addEventListener("submit", editContact);
}

function editContact(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const contact = loadContactById(getCurrentContactId());

  const updatedContact = {
    ...contact,
    name: formData.get("full-name"),
    email: formData.get("email"),
    phone: formData.get("phone-number"),
    address: formData.get("address"),
    isFavorited: Boolean(formData.get("favorite")),
    birthdate: !formData.get("birthdate")
      ? null
      : new Date(formData.get("birthdate")),
    labels: formData.getAll("label").map((label) => parseInt(label)),
  };

  const updatedContacts = loadContacts().map((contact) => {
    if (contact.id == getCurrentContactId()) {
      return updatedContact;
    }
    return contact;
  });

  saveContacts(updatedContacts);

  window.location.href = "/";
}

function renderLabels(selectedLabel) {
  const labels = loadLabels();

  return labels
    .map((label) => {
      return `
      <label>
          <input
              class="sr-only peer"
              name="label"
              type="checkbox"
              value="${label.id}"
              ${selectedLabel.includes(label.id) ? "checked" : ""}
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

window.addEventListener("load", renderEditContactForm);
