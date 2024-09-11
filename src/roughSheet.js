<StyledGridContainer columns={12} container columnSpacing={2}>
        {/* left side */}

        <Grid item desktop={5} tablets={1} phone={2}>
          <img
            className="w-full h-full object-cover"
            src={modalImage}
            alt="modal-image"
          />
        </Grid>
        <Grid p={0} item desktop={7} tablets={1} phone={2}>
          <motion.div className="flex flex-col py-5 px-10 w-full justify-center items-start">
            <CustomTitles
              weightFont={"bold"}
              align="left"
              color={theme.palette.secondary.main}
              variant="text_xl"
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
                    sx={{ width: 70, height: 70, marginBottom: "10px" }}
                  />
                ) : (
                  <FiUploadCloud
                    size={30}
                    color={theme.palette.secondary.main}
                  />
                )}
                <label htmlFor="icon-upload">
                  <h1>
                    {groupIcon ? "Change Group Icon" : "Select Group Icon"}
                  </h1>
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
                <span
                  style={{ color: "red", marginTop: "-10px", fontSize: "10px" }}
                >
                  {errors.groupIconError}
                </span>
              )}

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
            </FormContainer>
            <ButtonContainer>
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
            </ButtonContainer>
          </motion.div>
        </Grid>
      </StyledGridContainer>