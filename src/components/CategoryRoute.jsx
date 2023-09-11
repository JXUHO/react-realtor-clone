import { useEffect } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"

const CategoryRoute = () => {
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!params.categoryName) {
      console.log("redirect")
      navigate("/offers")
    }
  }, [params.categoryName, navigate])
  
  return(
    <>
      <Outlet/>
    </>
  )
}

export default CategoryRoute

