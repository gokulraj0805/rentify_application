let users = [];
let properties = [];
let currentUser = null;

// Function to register a user
function registerUser() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const userType = document.getElementById('user-type').value;

    if (firstName && lastName && email && phone && userType) {
        currentUser = { id: users.length + 1, firstName, lastName, email, phone, userType, properties: [] };
        users.push(currentUser);
        
        document.getElementById('registration-section').classList.add('hidden');
        
        if (userType === 'seller') {
            document.getElementById('seller-section').classList.remove('hidden');
        } else {
            document.getElementById('buyer-section').classList.remove('hidden');
            displayProperties();
        }
    } else {
        alert('Please fill in all fields.');
    }
}

// Function for sellers to post a property
function postProperty() {
    const place = document.getElementById('property-place').value;
    const area = document.getElementById('property-area').value;
    const bedrooms = document.getElementById('property-bedrooms').value;
    const bathrooms = document.getElementById('property-bathrooms').value;
    const nearby = document.getElementById('property-nearby').value;

    if (place && area && bedrooms && bathrooms && nearby) {
        const property = { id: properties.length + 1, place, area, bedrooms, bathrooms, nearby, sellerId: currentUser.id };
        properties.push(property);
        currentUser.properties.push(property);
        displaySellerProperties();
    } else {
        alert('Please fill in all fields.');
    }
}

// Display properties posted by the current seller
function displaySellerProperties() {
    const sellerPropertiesDiv = document.getElementById('seller-properties');
    sellerPropertiesDiv.innerHTML = '';
    currentUser.properties.forEach(property => {
        const propertyDiv = document.createElement('div');
        propertyDiv.className = 'property';
        propertyDiv.innerHTML = `
            <h4>${property.place}</h4>
            <p>Area: ${property.area} sq ft</p>
            <p>Bedrooms: ${property.bedrooms}</p>
            <p>Bathrooms: ${property.bathrooms}</p>
            <p>Nearby: ${property.nearby}</p>
        `;
        sellerPropertiesDiv.appendChild(propertyDiv);
    });
}

// Display all properties for buyers
function displayProperties() {
    const buyerPropertiesDiv = document.getElementById('buyer-properties');
    buyerPropertiesDiv.innerHTML = '';
    properties.forEach(property => {
        const propertyDiv = document.createElement('div');
        propertyDiv.className = 'property';
        propertyDiv.innerHTML = `
            <h4>${property.place}</h4>
            <p>Area: ${property.area} sq ft</p>
            <p>Bedrooms: ${property.bedrooms}</p>
            <p>Bathrooms: ${property.bathrooms}</p>
            <p>Nearby: ${property.nearby}</p>
            <button onclick="showSellerDetails(${property.sellerId})">I'm Interested</button>
        `;
        buyerPropertiesDiv.appendChild(propertyDiv);
    });
}

// Show seller details when a buyer is interested
function showSellerDetails(sellerId) {
    const seller = users.find(user => user.id === sellerId);
    if (seller) {
        alert(`Seller Details:\nName: ${seller.firstName} ${seller.lastName}\nEmail: ${seller.email}\nPhone: ${seller.phone}`);
    }
}
