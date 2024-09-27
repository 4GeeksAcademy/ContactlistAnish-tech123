const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			contacts: [],

			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			getContacts: () => {
				fetch("https://playground.4geeks.com/contact/agendas/Anish-123")
					.then((response) => {
						if (!response.ok) {
							throw new Error(`request error: ${response.status} ${response.statusText}`)

						}
						console.log("rawData from API:", response);
						return response.json();
					})
					.then((data) => {
						console.log("API response jsonified:", data);
						if (Array.isArray(data.contacts)) {
							setStore({
								contacts: data.contacts
							})
							console.log("contacts set in store:", data.contacts)
						} else {
							console.error("fetch data is not array:", data)
							setStore({ contacts: [] });
						}
					})
					.catch((error) => {
						console.error("fetching contacts failed:", error);
						error.status === 404 && getActions().addUser();
					})
			},
			addUser: () => {
				fetch("https://playground.4geeks.com/contact/agendas/Anish-123", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({})
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error(`request error: ${response.status} ${response.statusText}`)

						}
						console.log("rawData from API:", response);
						return response.json();
					})
					.then((data) => {
						console.log("API response jsonified:", data);
						console.log("User added successfully");
						getActions().getContacts();
					})
					.catch((error) => {
						console.error("adding user failed:", error);
					})
			},
			addContact: (contactData) => {
				fetch("https://playground.4geeks.com/contact/agendas/Anish-123/contacts", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contactData)
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error(`request error: ${response.status} ${response.statusText}`)

						}
						console.log("rawData from API:", response);
						return response.json();
					})
					.then((data) => {
						console.log("API response jsonified:", data);
						getActions().getContacts();
					})
					.catch((error) => {
						console.error("adding contact failed:", error);
					})
			},
			editContact: (id, contactData) => {
				fetch("https://playground.4geeks.com/contact/agendas/Anish-123/contacts/" + id, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contactData)
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error(`request error: ${response.status} ${response.statusText}`)

						}
						console.log("rawData from API:", response);
						return response.json();
					})
					.then((data) => {
						console.log("API response jsonified:", data);
						getActions().getContacts();
					})
					.catch((error) => {
						console.error("editing contact failed:", error);
					})
			},
			deleteContact: (id) => {
				fetch("https://playground.4geeks.com/contact/agendas/Anish-123/contacts/" + id, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error(`request error: ${response.status} ${response.statusText}`)

						}
						console.log("rawData from API:", response);
						// return response.json();
					})
					.then((data) => {
						// console.log("API response jsonified:", data);
						getActions().getContacts();
					})
					.catch((error) => {
						console.error("delete contact failed:", error);
					})
			},
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
