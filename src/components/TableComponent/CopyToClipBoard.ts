import toast from "react-hot-toast";

export default function copyIDsToClipboard(table: any) {
    const selectedRowIds = table.getSelectedRowModel().flatRows.map((row: any) => row.original.id);
    const clipboardText = selectedRowIds.join(", ");
    navigator.clipboard
        .writeText(clipboardText)
        .then(() => {
            console.log("IDs copied to clipboard:", clipboardText);
            toast.success("IDs copied to clipboard!", {
                duration: 3000, // Duration in milliseconds
            });
        })
        .catch((err) => {
            console.error("Failed to copy IDs to clipboard:", err);
            toast.error("Failed to copy IDs to clipboard.", {
                duration: 3000, // Duration in milliseconds
            });
        });
}
