import styles from "./Navbar.module.css"
import logo from "../StylingAndAnimations/download.svg"
import { FormEvent, useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

const SEARCH_USERS = gql`
    query Search($name: String) {
        search(name: $name) {
            firstName
            lastName
        }
    }
`

const Navbar = () => {

    let [searchParams, setSearchParams] = useSearchParams();
    let users = searchParams.get("users");

    const [searchUsers, {loading, error, data}] = useLazyQuery(SEARCH_USERS)

    const onSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let formData = new FormData(e.currentTarget);
        let newUser = formData.get("users") as string;
        if (!newUser) return;
        setSearchParams({ users: newUser });
    }

    useEffect(() => {
        if (!users) return
        if (users) {
            searchUsers({variables: {name: users}})
        }
        if (data) {
            console.log(data)
        }
    }, [users, data])

    return(
        <nav className={styles.navbar}>
            <img className={styles.logo} src={logo} alt="Fakebook logo"/>
            <form className={styles.searchform} onSubmit={(e) => onSearch(e)}>
                <input className={styles.search} type="search" name="users"></input>
                <button type="submit" className={styles.searchbtn}>Search</button>
            </form>
            <div className={styles.navicons}>
                <h1 className={styles.navtext}>Messages</h1>
                <h1 className={styles.navtext}>Profile</h1>
                <h1 className={styles.navtext}>Log Out</h1>
            </div>
        </nav>
    )
}

export default Navbar