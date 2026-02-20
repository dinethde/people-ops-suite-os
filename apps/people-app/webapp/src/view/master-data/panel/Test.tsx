import {
  Autocomplete,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useState } from "react";

import {
  BusinessUnit,
  useUpdateBusinessUnitMutation,
  useUpdateBusinessUnitTeamMutation,
  useUpdateSubTeamMutation,
  useUpdateSubTeamUnitMutation,
  useUpdateTeamMutation,
  useUpdateTeamSubTeamMutation,
  useUpdateUnitMutation,
} from "../../../services/organization";
import { EditModal } from "./components/EditModal";

// Custom styled Paper component for the dropdown
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.surface.secondary.active,
  border: `1px solid ${theme.palette.customBorder.primary.b2.active}`,
  borderRadius: "4px",
  marginTop: "2px",
  boxShadow: "none",
}));

// Sample data for autocomplete
const teamOptions = [
  "Engineering Team",
  "Design Team",
  "Product Team",
  "Marketing Team",
  "Sales Team",
  "HR Team",
  "Finance Team",
  "Operations Team",
];

const userOptions = [
  { label: "John Doe", id: 1 },
  { label: "Jane Smith", id: 2 },
  { label: "Mike Johnson", id: 3 },
  { label: "Sarah Wilson", id: 4 },
  { label: "David Brown", id: 5 },
  { label: "Lisa Davis", id: 6 },
];

export default function test() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<{ label: string; id: number } | null>(null);
  const [multipleTeams, setMultipleTeams] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Mutation hooks
  const [updateBusinessUnit, { isLoading: isUpdatingBU }] = useUpdateBusinessUnitMutation();
  const [updateTeam, { isLoading: isUpdatingTeam }] = useUpdateTeamMutation();
  const [updateSubTeam, { isLoading: isUpdatingSubTeam }] = useUpdateSubTeamMutation();
  const [updateUnit, { isLoading: isUpdatingUnit }] = useUpdateUnitMutation();
  const [updateBusinessUnitTeam, { isLoading: isUpdatingBUTeam }] =
    useUpdateBusinessUnitTeamMutation();
  const [updateTeamSubTeam, { isLoading: isUpdatingTeamSubTeam }] = useUpdateTeamSubTeamMutation();
  const [updateSubTeamUnit, { isLoading: isUpdatingSubTeamUnit }] = useUpdateSubTeamUnitMutation();

  // Sample payloads
  const samplePayload = { name: "Updated Name", headEmail: "head@example.com" };
  const sampleBuId = "101";
  const sampleTeamId = "201";
  const sampleSubTeamId = "301";
  const sampleUnitId = "401";

  // Sample data for EditModal
  const sampleBusinessUnit: BusinessUnit = {
    id: "101",
    name: "Engineering",
    headCount: 31,
    teams: [
      { id: "1", name: "Backend Team", headCount: 12, subTeams: [] },
      { id: "2", name: "Frontend Team", headCount: 8, subTeams: [] },
      { id: "3", name: "DevOps Team", headCount: 5, subTeams: [] },
      { id: "4", name: "QA Team", headCount: 6, subTeams: [] },
    ],
    head: {
      name: "sachin",
      title: "sse",
    },
    functionalLead: {
      name: "Chanuka",
      title: "STL",
    },
  };

  return (
    <>
      <h1>Test</h1>
      <Button variant="outlined" color="primary">
        Test
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
        style={{ marginLeft: "10px" }}
      >
        Open Edit Modal
      </Button>
      <TextField placeholder="Dineth" />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "400px",
        }}
      >
        <h3>Autocomplete Components</h3>

        {/* Simple Autocomplete */}
        <Autocomplete
          options={teamOptions}
          value={selectedTeam}
          onChange={(_event, newValue) => setSelectedTeam(newValue)}
          slots={{
            paper: StyledPaper,
          }}
          renderInput={(params) => <TextField {...params} placeholder="Choose your team" />}
        />

        {/* Autocomplete with objects */}
        <Autocomplete
          options={userOptions}
          getOptionLabel={(option) => option.label}
          value={selectedUser}
          onChange={(_event, newValue) => setSelectedUser(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Select a user" placeholder="Choose a user" />
          )}
        />

        {/* Multiple selection */}
        <Autocomplete
          multiple
          options={teamOptions}
          value={multipleTeams}
          onChange={(_event, newValue) => setMultipleTeams(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Select multiple teams" placeholder="Choose teams" />
          )}
        />

        {/* Disabled state */}
        <Autocomplete
          options={teamOptions}
          disabled
          renderInput={(params) => (
            <TextField {...params} label="Disabled autocomplete" placeholder="This is disabled" />
          )}
        />

        {/* Error state */}
        <Autocomplete
          options={teamOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Error state"
              placeholder="This has an error"
              error
              helperText="This field is required"
            />
          )}
        />

        {/* Display selected values */}
        <div
          style={{
            marginTop: "16px",
            padding: "12px",
            backgroundColor: "#f5f5f5",
            borderRadius: "6px",
          }}
        >
          <h4>Selected Values:</h4>
          <p>Team: {selectedTeam || "None"}</p>
          <p>User: {selectedUser?.label || "None"}</p>
          <p>Multiple Teams: {multipleTeams.length > 0 ? multipleTeams.join(", ") : "None"}</p>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={sampleBusinessUnit}
        type="BusinessUnit"
      />

      {/* API Call Buttons */}
      <div
        style={{
          marginTop: "32px",
          padding: "16px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Organization API Calls
        </Typography>
        <Stack spacing={2}>
          {/* Update Business Unit */}
          <Button
            variant="contained"
            disabled={isUpdatingBU}
            startIcon={isUpdatingBU ? <CircularProgress size={16} /> : null}
            onClick={() => updateBusinessUnit({ id: sampleBuId, payload: samplePayload })}
          >
            Update Business Unit (id: {sampleBuId})
          </Button>

          {/* Update Team */}
          <Button
            variant="contained"
            disabled={isUpdatingTeam}
            startIcon={isUpdatingTeam ? <CircularProgress size={16} /> : null}
            onClick={() => updateTeam({ id: sampleTeamId, payload: samplePayload })}
          >
            Update Team (id: {sampleTeamId})
          </Button>

          {/* Update Sub Team */}
          <Button
            variant="contained"
            disabled={isUpdatingSubTeam}
            startIcon={isUpdatingSubTeam ? <CircularProgress size={16} /> : null}
            onClick={() => updateSubTeam({ id: sampleSubTeamId, payload: samplePayload })}
          >
            Update Sub Team (id: {sampleSubTeamId})
          </Button>

          {/* Update Unit */}
          <Button
            variant="contained"
            disabled={isUpdatingUnit}
            startIcon={isUpdatingUnit ? <CircularProgress size={16} /> : null}
            onClick={() => updateUnit({ id: sampleUnitId, payload: samplePayload })}
          >
            Update Unit (id: {sampleUnitId})
          </Button>

          {/* Update Business Unit → Team */}
          <Button
            variant="contained"
            disabled={isUpdatingBUTeam}
            startIcon={isUpdatingBUTeam ? <CircularProgress size={16} /> : null}
            onClick={() =>
              updateBusinessUnitTeam({
                buId: sampleBuId,
                teamId: sampleTeamId,
                payload: samplePayload,
              })
            }
          >
            Update BU→Team (buId: {sampleBuId}, teamId: {sampleTeamId})
          </Button>

          {/* Update Team → Sub Team */}
          <Button
            variant="contained"
            disabled={isUpdatingTeamSubTeam}
            startIcon={isUpdatingTeamSubTeam ? <CircularProgress size={16} /> : null}
            onClick={() =>
              updateTeamSubTeam({
                teamId: sampleTeamId,
                subTeamId: sampleSubTeamId,
                payload: samplePayload,
              })
            }
          >
            Update Team→SubTeam (teamId: {sampleTeamId}, subTeamId: {sampleSubTeamId})
          </Button>

          {/* Update Sub Team → Unit */}
          <Button
            variant="contained"
            disabled={isUpdatingSubTeamUnit}
            startIcon={isUpdatingSubTeamUnit ? <CircularProgress size={16} /> : null}
            onClick={() =>
              updateSubTeamUnit({
                subTeamId: sampleSubTeamId,
                unitId: sampleUnitId,
                payload: samplePayload,
              })
            }
          >
            Update SubTeam→Unit (subTeamId: {sampleSubTeamId}, unitId: {sampleUnitId})
          </Button>
        </Stack>
      </div>
    </>
  );
}
