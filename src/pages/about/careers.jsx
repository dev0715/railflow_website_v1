import React from "react"
import { GatsbySeo } from 'gatsby-plugin-next-seo';

import Layout from "../../components/layout"
// import ComingSoon from '../components/coming-soon';
import {
    JobPosts,
    // TODO: import remaining sections
} from "../../components/careers-sections"

const CareersPage = () => {
    return (
        <Layout>
            <GatsbySeo
                title='Join Our Team - Railflow'
                description='Railflow is looking for talented engineers who have a passion for developer productivity and tools. To join our exciting team, send us your resume and tell us why you would like to work at Railflow'
                canonical='https://railflow.io/about/careers'
            />
            <JobPosts />
        </Layout>
    )
}

export default CareersPage
