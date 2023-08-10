"use client";
import { withProtected } from "@/hooks/routes";
import { Button, Card, Container, Grid, Stack } from "@mui/material";
import ListOfPlaces from "./components/ListOfPlaces";
import { useEffect, useState } from "react";
import { getProposalPlaces } from "@/services/placeProposal/placeProposal.service";
import { Place } from "@/services/place/placeInterface";
import { ProposalPlaceInterface } from "@/services/placeProposal/placeInterface";

function ProposalPlaces() {
  const [propPlacesArr, setPropPlacesArr] = useState<ProposalPlaceInterface[]>([]);
  useEffect(() => {
    const getData = async () => {
      const proposalPlaces = await getProposalPlaces();
      if (proposalPlaces === undefined) return;
      setPropPlacesArr(proposalPlaces);
    };
    getData();
  }, []);
  return (
    <Container maxWidth="md" sx={{ marginTop: "5vh" }}>
      <ListOfPlaces arr={propPlacesArr} />
    </Container>
  );
}
export default withProtected(ProposalPlaces);
