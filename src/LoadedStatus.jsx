import React from 'react';

import { useState , useEffect} from "react";


function LoadedStatus(props) {
    const [isLoaded, setIsLoaded] = useState(() => null);

    return (
        <div>
                {isLoaded ? 'En ligne' : '??Hors-ligne'}

        </div>
    );
}

export default LoadedStatus;