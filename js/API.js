class API {

    constructor() {
        this.url = 'http://datos.minem.gob.ar/api/3/action/datastore_search?';
    }

    async getDataByProvinceAndTypeFuel(data) {
        const params = this.customQueryParams(data);
        // const headers = this.customHeaders();
        const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        const results = await axios.get(`${PROXY_URL + this.url + params}`, {
            // mode: 'no-cors',
            headers: {
                'timeout': 1000 * 30,
                'Accept': 'application/json'
            }
        });
        const response = await results.data;
        return response;
    }

    customQueryParams(data) {
        const params = `resource_id=80ac25de-a44a-4445-9215-090cf55cfda5&filters={"provincia":["${data.province}"],"producto":["${data.product}"]}&limit=5650`;
        return params;
    }

    customHeaders() {
        const config = {
            headers: {
                'Referer': 'datos.minem.gob.ar'
            }
        };

        return config;
    }
}