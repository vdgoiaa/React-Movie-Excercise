import { Button } from "@material-ui/core";
import React from "react";

const Pagination = (props) => {
  const handlePageChange = (newPage) => {
    return () => {
      if (props.onPageChange) {
        props.onPageChange(newPage);
      }
    };
  };
  console.log(props);
  return (
    <div style={{ textAlign: "center" }}>
      <Button
        size="medium"
        variant="contained"
        color="primary"
        onClick={handlePageChange(props.pagination?.currentPage - 1)}
        style={{ marginRight: 15 }}
        disabled={props.pagination?.currentPage <= 1}
      >
        Prev
      </Button>
      <Button
        size="medium"
        variant="contained"
        color="primary"
        onClick={handlePageChange(props.pagination?.currentPage + 1)}
        disabled={props.pagination?.currentPage >= props.pagination?.totalPages}
      >
        Next
      </Button>
    </div>
  );
};
export default Pagination;
