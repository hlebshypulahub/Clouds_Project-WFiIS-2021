const FACILITY_API_BASE_URL: string = "http://localhost:8080/facilities";

type Facility = {
    name: string;
    city: string;
}

class FacilityService {

    getFacilities(): Promise<Response> {
        return fetch(FACILITY_API_BASE_URL);
    }

    createFacility(facility: Facility): Promise<Response> {
        return fetch(FACILITY_API_BASE_URL, {
            method: 'POST',
            body: JSON.stringify(facility),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });
    }

    getFacilityByName(facilityName: string): Promise<Response> {
        return fetch(FACILITY_API_BASE_URL + "/" + facilityName);
    }

    deleteFacility(facilityName: string): Promise<Response> {
        return fetch(FACILITY_API_BASE_URL + "/" + facilityName, {
            method: 'DELETE',
        });
    }
}

export default new FacilityService();