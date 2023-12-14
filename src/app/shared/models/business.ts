export class Business {
    business_id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    stars: string;
    review_count: string;
    is_open: string;
    categories: string;

    constructor(data: any) {
        if (data) {
            this.business_id = data.business_id;
            this.name = data.name;
            this.address = data.address;
            this.city = data.city;
            this.state = data.state;
            this.postal_code = data.postal_code;
            this.stars = data.stars;
            this.review_count = data.review_count;
            this.is_open = 'closed';
            this.categories = data.categories;
        }
        else {
            this.business_id = '';
            this.name = '';
            this.address = '';
            this.city = '';
            this.state = '';
            this.postal_code = '';
            this.stars = '';
            this.review_count = '';
            this.is_open = '';
            this.categories = '';
        }
    }
}


