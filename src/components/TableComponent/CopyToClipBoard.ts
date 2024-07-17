import toast from "react-hot-toast";

export default function copyIDsToClipboard(table: any) {
  const selectedRowIds = table
    .getSelectedRowModel()
    .flatRows.map((row: any) => row.original.id);
  const clipboardText = selectedRowIds.join(", ");
  navigator.clipboard
    .writeText(clipboardText)
    .then(() => {
      toast.success("IDs copied to clipboard!", {
        duration: 3000, // Duration in milliseconds
      });
    })
    .catch((err) => {
      toast.error("Failed to copy IDs to clipboard.", {
        duration: 3000, // Duration in milliseconds
      });
    });
}
