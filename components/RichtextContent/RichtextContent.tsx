import React from "react";
import {RichtextContentProps} from "@components/RichtextContent/RichtextContent.types";
import {PortableText} from "@portabletext/react";
import {RichtextImage} from "@components/RichtextImage/RichtextImage";


const RichtextContent = ({children}: RichtextContentProps) => {
    return (<div className="richtext-content">
        <PortableText value={children} components={
            {
                types: {
                    image: RichtextImage
                }
            }
        }/>
    </div>)
}


export default RichtextContent
