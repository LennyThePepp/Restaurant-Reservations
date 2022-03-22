/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from './format-reservation-date';
import formatReservationTime from './format-reservation-date';

const API_BASE_URL =
	process.env.REACT_APP_API_BASE_URL //|| 'http://localhost:5000';

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append('Content-Type', 'application/json');
// headers.append('Access-Control-Allow-Origin', '*');
/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
	try {
		const response = await fetch(url, options);
		if (response.status === 204) {
			return null;
		}
		const payload = await response.json();
		if (payload.error) {
			return Promise.reject({ message: payload.error });
		}
		return payload.data;
	} catch (error) {
		if (error.name !== 'AbortError') {
			console.error(error.stack);
			throw error;
		}
		return Promise.resolve(onCancel);
	}
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
	// params are date and mobile_number
	if (params) {
		const url = new URL(`${API_BASE_URL}/reservations`);
		Object.entries(params).forEach(([key, value]) =>
			url.searchParams.append(key, value.toString())
		);
		return await fetchJson(url, { headers, signal }, [])
			.then(formatReservationDate)
			.then(formatReservationTime);
	} else {
		// fetch all reservations if no param
		const url = `${API_BASE_URL}/reservations`;
		return await fetchJson(url, { headers, signal }, []);
	}
}

// this is a function to list reservations filtered by their reservation_id
export async function readReservation(reservationId, signal) {
	const url = `${API_BASE_URL}/reservations/${reservationId}/seat`;
	return await fetchJson(url, { signal }, {});
}

// This is a function to list all tables
export async function listTables(signal) {
	const url = new URL(`${API_BASE_URL}/tables`);
	return await fetchJson(url, { headers, signal }, []);
}

// This is a function to read tables
export async function readTables(tableId, signal) {
	const url = `${API_BASE_URL}/tables/${tableId}`;
	return await fetchJson(url, { signal }, {});
}

// This is a function that creates reservations and sends them to the API.
export async function createReservation(reservation, signal) {
	const url = `${API_BASE_URL}/reservations`;
	reservation.people = Number(reservation.people);
	const options = {
		method: 'POST',
		headers,
		body: JSON.stringify({ data: reservation }),
		signal,
	};

	return await fetchJson(url, options);
}

// This is a function to create a new table
export async function createTable(table, signal) {
	const url = `${API_BASE_URL}/tables`;
	table.capacity = Number(table.capacity);
	const options = {
		method: 'POST',
		headers,
		body: JSON.stringify({ data: table }),
		signal,
	};
	return await fetchJson(url, options);
}

// This is a function to update an exisiting table
export async function updateTable(tableId, reservationId, signal) {
	const url = `${API_BASE_URL}/tables/${tableId}/seat`;
	const options = {
		method: 'PUT',
		headers,
		body: JSON.stringify({ data: { reservation_id: reservationId } }),
		signal,
	};
	return await fetchJson(url, options);
}

// this function deletes the reservation_id from the table db
export async function unseatTable(tableId) {
	const url = `${API_BASE_URL}/tables/${tableId}/seat`;
	const options = {
		method: 'DELETE',
	};
	return await fetchJson(url, options);
}

// sets reservation status to cancelled
export async function cancelReservation(reservation, signal) {
	const url = `${API_BASE_URL}/reservations/${reservation.reservation_id}/status`;
	const options = {
		method: 'PUT',
		headers,
		body: JSON.stringify({
			data: {
				reservation_id: reservation.reservation_id,
				status: 'cancelled',
			},
		}),
		signal,
	};
	return await fetchJson(url, options);
}

// updates reservation!
export async function updateReservation(reservation, signal) {
	const url = `${API_BASE_URL}/reservations/${reservation.reservation_id}`;
	reservation.people = Number(reservation.people);
	const options = {
		method: 'PUT',
		headers,
		body: JSON.stringify({ data: reservation }),
		signal,
	};

	return await fetchJson(url, options, reservation);
}
