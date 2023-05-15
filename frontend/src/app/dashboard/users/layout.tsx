import {ReactNode} from "react";

export default function UsersLayout( { children } : { children: ReactNode } ){
    return(
        <div>
          {children}
        </div>
    )
}