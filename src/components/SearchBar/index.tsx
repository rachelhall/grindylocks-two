import React, { useState } from "react";

import TextInput from "grindylocks/styleComponents/TextInput";
import { BsSearch } from "react-icons/bs"

import styles from "./SearchBar.module.scss";
import { api } from "grindylocks/utils/api";
import DropdownMenu from "grindylocks/styleComponents/DropdownMenu";
import SearchItemCard from "../SearchItemCard";
import { IMenuItem } from "grindylocks/styleComponents/MenuItem";

interface IProps {

}

export const SearchBar: React.FC<IProps> = (props) => {
    const { } = props;

    const [input, setInput] = useState("")
    const { data, isLoading, } = api.search.all.useQuery({ searchTerm: input }, { enabled: input !== "" })

    const resultItems: IMenuItem[] = []
    data?.accounts.forEach(account => {
        resultItems.push(
            {
                component:
                    <SearchItemCard
                        avatarSrc={account.profilePicture}
                        href={""}
                        name={`${account.first_name} ${account.last_name}`}
                    />
            }
        )
    })
    data?.businesses.forEach(business => {
        resultItems.push({ component: <SearchItemCard href="" avatarSrc={business.profilePicture} name={business.name} /> })
    })
    data?.parks.forEach(park => {
        resultItems.push(
            { component: <SearchItemCard href="" avatarSrc={park.media[0]?.url} name={park.name} /> }
        )
    })

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    return (
        <div className={styles.SearchBar}>
            <TextInput
                icon={<BsSearch className={styles.icon} />}
                name="search" type={"code"} onChange={handleSearchInput}
            />
            {resultItems.length > 0 ? <DropdownMenu items={resultItems} className={styles.searchBarDropdownMenu} /> : null}
        </div>
    );
};

export default SearchBar;
