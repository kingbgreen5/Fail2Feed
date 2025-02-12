import { useState } from "react";

const FirearmSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(null);

    const handleSearch = async () => {
        if (!query) return;

        const response = await fetch(`/api/firearms/search?model=${query}`);
        if (response.ok) {
            const data = await response.json();
            setResults(data);
        } else {
            alert("No data found for this firearm.");
        }
    };

    return (
        <div>
            <h2>Search Firearm Reports</h2>
            <input
                type="text"
                placeholder="Enter firearm model"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {results && (
                <div>
                    <h3>Results for {query}:</h3>
                    <p><strong>Total Rounds Fired:</strong> {results.total_rounds}</p>
                    <p><strong>Total Malfunctions:</strong> {results.total_malfunctions}</p>
                    <h4>Malfunction Breakdown:</h4>
                    <ul>
                        {Object.entries(results.malfunction_types).map(([type, count]) => (
                            <li key={type}>{type}: {count}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FirearmSearch;
