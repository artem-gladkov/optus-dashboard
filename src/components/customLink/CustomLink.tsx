import { Link, useMatch } from 'react-router-dom'

export const CustomLink = ({children, to, ...props}) => {

    const match = useMatch(to)


    return (
        <Link to={to}
            style= {{
                color: match ? '#D8D3E3' : '#6A637A',
                background: match ? '#2C2445' : '#161223'
            }}
            {...props}>
            {children}
        </Link>
    )
}

 
