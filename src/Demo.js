import React from 'react'
import { useQuery, gql } from '@apollo/client'


const COUNTRY = gql`
query country($code: ID!){
    country(code: $code){
        name
        emoji
}
}
`

const Demo = () => {
    debugger;
    const { data, loading, error } = useQuery(COUNTRY, { variables: { code: 'NZ' } })
    return (
   <div>
       {loading ? <h1>Loading</h1> : <p>{data.country.name} {data.country.emoji}</p> }
       </div>
        
    )
}

export default Demo;