import React from "react"
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import JobDescription from "../../components/careers-sections/job-description/job-description"
import { currentJobs } from "../../components/careers-sections/job-posts/job-posts"

import Layout from "../../components/layout"

const SeniorJavaDevPage = () => {
  return (
    <Layout>

      <GatsbySeo
        title='Senior JAVA/J2EE Developer'
        description='Railflow is looking for a Senior Java/J2EE Developer who is a team player, strategic thinker and self-motivated problem solver to join our team.'
        canonical='https://railflow.io/job/senior-java-developer'
      />

      <JobDescription job={currentJobs[1]} />
    </Layout>
  )
}

export default SeniorJavaDevPage
