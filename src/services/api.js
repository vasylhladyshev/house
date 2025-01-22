const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchData() {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "X-Api-Key": API_KEY,
            },
        });

        return await response.json();

    } catch (error) {
        console.error("Error loading data:", error);
    }
}

export async function submitHouseForm(formData, editingItem) {
    const url = editingItem && editingItem.id ? `${API_URL}/${editingItem.id}`
        : API_URL;
    try {

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "X-Api-Key": API_KEY,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Server error: ${await response.text()}`);
        }

        if (response.status === 204) {
            return {};
        }

        return await response.json(); 


    } catch (error) {
        console.error('Error loading data:', error)
    }
}

export async function uploadHouseImage(houseId, file) {
    const uploadUrl = `${API_URL}/${houseId}/upload`;
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(uploadUrl, {
            method: "POST",
            headers: {
                "X-Api-Key": API_KEY,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Server error: ${await response.text()}`);
        }

    } catch (error) {
        console.error("Error loading data:", error);
    }
}

export async function deletePostById(houseId) {
    const url = `${API_URL}/${houseId}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "X-Api-Key": API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${await response.text()}`);
        }

    } catch (error) {
        console.error("Error loading data:", error);
    }

}

export async function fetchHouseById(houseId) {
    try {
        const response = await fetch(`${API_URL}/${houseId}`, {
            method: "GET",
            headers: {
                "X-Api-Key": API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`Server error: ${await response.text()}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching house:", error);
        return null;
    }
}