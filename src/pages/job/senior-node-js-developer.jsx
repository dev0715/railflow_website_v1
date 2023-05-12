import React from "react"
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import JobDescription from "../../components/careers-sections/job-description/job-description"
import { currentJobs } from "../../components/careers-sections/job-posts/job-posts"

import Layout from "../../components/layout"

const SeniorNodeDevPage = () => {
  return (
    <Layout>
      <GatsbySeo
      title='Senior nodeJS Developer'
      description='Railflow is looking for a Senior nodeJS developer who is a team player, strategic thinker and self-motivated problem solver to join our team.'
      canonical='https://railflow.io/job/senior-node-js-developer'
      
    />
      <JobDescription job={currentJobs[0]} />
    </Layout>
  )
}

export default SeniorNodeDevPage
