"use client";
import { withProtected } from "@/hooks/routes";
import { Button, Card, Container, Grid, Stack } from "@mui/material";

import Link from "next/link";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { pages } from "@/layout/Nav/Nav";

function Item({
  props,
}: {
  props: {
    name: string;
    title: string;
    icon: JSX.Element;
    subPage?: { name: string; title: string; icon: React.JSX.Element }[];
  };
}) {
  return (
    <div>
      <Link href={`/adminPanel/${props.name}`}>
        <Button
          variant="contained"
          startIcon={props.icon}
          sx={{ width: "100%" }}>
          {props.title}
        </Button>
      </Link>
    </div>
  );
}

function AdminPanel() {
  const adminPages = pages.filter((element) => element.name === "adminPanel")[0]
    .subPage;
  return (
    <Container maxWidth="sm" sx={{ marginTop: "5vh" }}>
      <Stack spacing={2}>
        {adminPages?.map((item) => (
          <>
            <Item props={item} />
          </>
        ))}
      </Stack>
    </Container>
  );
}
export default withProtected(AdminPanel);
