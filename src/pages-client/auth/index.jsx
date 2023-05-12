import { navigate } from "@reach/router"

// TODO: review
const Index = props => {
  const { location } = props

  if (location.pathname.match(/^\/register/)) {
    // INFO: redirect to sign up page
    navigate("/register")
  }

  return null
}

export default Index
