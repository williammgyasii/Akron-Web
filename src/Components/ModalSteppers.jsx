import {
  Avatar,
  CircularProgress,
  IconButton,
  List,
  styled,
  useTheme,
} from "@mui/material";
import CustomFormInput from "./CustomFormInput";
import { PersonAdd } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import CustomTitles from "./CustomTitles";
import { FiUploadCloud } from "react-icons/fi";

const MembersList = styled(List)({
  //   marginTop: "16px",
  maxHeight: "200px", // Adjust the height as needed
  overflowY: "auto",
  "& li": {
    borderBottom: "1px solid #ddd", // Optional: adds a border between items
  },
});

export const AddMembersSection = ({
  searchEmail,
  setSearchEmail,
  errors,
  handleAddMember,
  memberLoading,
  renderMemberList,
}) => {
  const theme = useTheme();
  return (
    <>
      <CustomFormInput
        label="Add team members by emails"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        fullWidth
        error={!!errors.emailError}
        helperText={errors.emailError}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleAddMember}>
              {memberLoading ? (
                <CircularProgress size={20} />
              ) : (
                <PersonAdd sx={{ color: theme.palette.primary.main }} />
              )}
            </IconButton>
          ),
        }}
      />

      <MembersList>{renderMemberList()}</MembersList>
    </>
  );
};

export const CreateAccountSection = ({
  groupName,
  setGroupName,
  errors,
  groupIcon,
  setGroupIcon,
  handleClose,
  handleSubmit,
}) => {
  const theme = useTheme();
  const { GROUP_SLICE_STATUS, GROUP_SLICE_ISLOADING } = useSelector(
    (state) => state.groups
  );
  return (
    <motion.div className="flex flex-col w-full justify-center items-start">
      <CustomTitles
        weightFont={"bold"}
        align="left"
        color={theme.palette.secondary.main}
        variant="text_2xl"
        withLine
        subtitle={"Getting started by creating a group"}
      >
        Create A Group
      </CustomTitles>

      <FormContainer>
        <CustomFormInput
          label="Group Name or Alias"
          value={groupName}
          type={"text"}
          onChange={(e) => setGroupName(e.target.value)}
          fullWidth
          required
          maxCount={20}
          helperText={errors.groupNameError}
          error={Boolean(errors.groupNameError)}
        />
        <GroupIconContainer>
          {groupIcon ? (
            <Avatar
              src={groupIcon ? URL.createObjectURL(groupIcon) : null}
              alt="Group Icon"
              sx={{ width: 70, height: 70,marginRight:"10px" }}
            />
          ) : (
            <FiUploadCloud size={30} color={theme.palette.secondary.main} />
          )}
          <label htmlFor="icon-upload">
            <h1>{groupIcon ? "Change Group Icon" : "Select Group Icon"}</h1>
            <span
              style={{
                fontSize: "10px",
                color: "#ccc",
                marginTop: "-20px",
              }}
            >
              SVG,PNG,max(200mb)
            </span>
          </label>
          <input
            id="icon-upload"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setGroupIcon(e.target.files[0])}
          />
        </GroupIconContainer>
        {Boolean(errors.groupIconError) && (
          <span style={{ color: "red", marginTop: "-10px", fontSize: "10px" }}>
            {errors.groupIconError}
          </span>
        )}
      </FormContainer>
      {/* <ButtonContainer>
        <CustomButton
          onClick={handleClose}
          // // type="iconOnly"
          // loadingButton={groupUploading}
          // leftIcon={MdFormatListBulletedAdd}
          disabled={GROUP_SLICE_ISLOADING}
          submit
          size="medium"
          sx={{ color: "#fff" }}
          variant="secondary"
        >
          Cancel
        </CustomButton>
        <CustomButton
          onClick={handleSubmit}
          // disabled={buttonNext}
          leftIcon={MdFormatListBulletedAdd}
          isLoading={GROUP_SLICE_ISLOADING}
          submit
          size="medium"
          sx={{ color: "#fff" }}
          type="iconLeft"
          variant="primary"
          color="primary"
        >
          Create Group
        </CustomButton>
      </ButtonContainer> */}
    </motion.div>
  );
};

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "10px",
  marginTop: "30px",
});

const GroupIconContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  //   gap: "16px",
  marginBottom: "10px",
  padding: "10px",
  border: "1px dashed #10197A",
  borderRadius: "10px",
});
