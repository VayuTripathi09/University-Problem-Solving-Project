// Faculty Finder Application Logic

// Get DOM elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsSection = document.getElementById('resultsSection');
const totalFacultyEl = document.getElementById('totalFaculty');
const totalDepartmentsEl = document.getElementById('totalDepartments');

// Initialize stats on page load
function initializeStats() {
    totalFacultyEl.textContent = facultyData.length;
    
    // Count unique departments
    const departments = new Set(facultyData.map(faculty => faculty.department));
    totalDepartmentsEl.textContent = departments.size;
}

// Search function - implements simple text matching algorithm
function searchFaculty(query) {
    if (!query || query.trim() === '') {
        return [];
    }
    
    const searchTerm = query.toLowerCase().trim();
    const results = [];
    
    // Simple linear search algorithm
    // Checks if search term matches name or department
    for (let i = 0; i < facultyData.length; i++) {
        const faculty = facultyData[i];
        const nameMatch = faculty.name.toLowerCase().includes(searchTerm);
        const deptMatch = faculty.department.toLowerCase().includes(searchTerm);
        
        // If either name or department matches, add to results
        if (nameMatch || deptMatch) {
            results.push(faculty);
        }
    }
    
    return results;
}

// Display search results
function displayResults(results) {
    resultsSection.innerHTML = '';
    
    if (results.length === 0) {
        // No results found
        resultsSection.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <p>No faculty members found matching your search.</p>
                <p style="margin-top: 10px; font-size: 0.9rem;">Try a different name or department.</p>
            </div>
        `;
        return;
    }
    
    // Display each result as a card
    results.forEach(faculty => {
        const card = document.createElement('div');
        card.className = 'faculty-card';
        
        card.innerHTML = `
            <div class="faculty-name">${faculty.name}</div>
            <div class="faculty-department">📚 ${faculty.department}</div>
            <div class="location-info">
                <div class="location-item">
                    <span class="location-label">Block:</span>
                    <span class="location-value">${faculty.block}</span>
                </div>
                <div class="location-item">
                    <span class="location-label">Floor:</span>
                    <span class="location-value">${faculty.floor}</span>
                </div>
                <div class="location-item">
                    <span class="location-label">Cabin:</span>
                    <span class="location-value">${faculty.cabin}</span>
                </div>
            </div>
        `;
        
        resultsSection.appendChild(card);
    });
}

// Handle search button click
function handleSearch() {
    const query = searchInput.value;
    const results = searchFaculty(query);
    displayResults(results);
}

// Event listeners
searchBtn.addEventListener('click', handleSearch);

// Allow Enter key to trigger search
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Real-time search as user types (optional - can be removed for simpler version)
searchInput.addEventListener('input', function() {
    const query = searchInput.value;
    if (query.length >= 2) {
        const results = searchFaculty(query);
        displayResults(results);
    } else if (query.length === 0) {
        // Show welcome message when search is cleared
        resultsSection.innerHTML = `
            <div class="welcome-message">
                <p>👋 Welcome! Search for a faculty member to find their office location.</p>
                <p class="hint">Try searching for names like "Dr. Smith" or departments like "Computer Science"</p>
            </div>
        `;
    }
});

// Initialize the page
initializeStats();

