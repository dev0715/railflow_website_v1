import React from "react"
import { GatsbySeo } from 'gatsby-plugin-next-seo';

import Layout from "../../components/layout"
// import ComingSoon from '../components/coming-soon';
import {
    Description,
    // TODO: import remaining sections
} from "../../components/company-sections"

const CompanyPage = () => {
    return (
        <Layout>
            <GatsbySeo
                title='Know  More about our Company | Railflow'
           
                description='Railflow is located in San Francisco, California and surrounded by the greatest tech companies in the world. Many of our customers are located right here in the Bay Area. We get to listen to our customers over coffee, learn from them, and design thoughful solutions for the global market'
            />
            <Description />
        </Layout>
    )
}

export default CompanyPage
