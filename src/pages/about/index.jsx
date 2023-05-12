import { navigate } from "@reach/router"

const Index = props => {
    const { location } = props
    if (location.pathname === "/about/") {
        // INFO: redirect to sign up page
        navigate("/about/company")
    }

    return null
}

export default Index
