// SwitchDemo.js or SwitchDemo.jsx
"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import {patchStatus} from "@/utils/patchData";

export default function SwitchDemo({ active, slug }) {
    const [status, setStatus] = useState(active);

    const handleStatusCheck = async () => {
        const newStatus = !status;
        setStatus(newStatus);

        try {
            await patchStatus(slug, newStatus);
        } catch (error) {
            console.error("Failed to update status:", error);
            // Revert status if the update fails
            setStatus(!newStatus);
        }
    };

    console.log('slug=>',slug)
    return (
        <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" onClick={handleStatusCheck} checked={status} />
        </div>
    );
}
