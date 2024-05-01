import { Axios } from '@/lib/axios';
import React from 'react'

const Page = ({ params }) => {
    const { id } = params;

    // Fetch API data using the dynamic id
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios(`/api/data/${id}`);
                const data = await response.json();
                // Process the fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>page</div>
    );
};

export default Page;
