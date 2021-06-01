import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const HomeDashboard = (homePageData) => {
  return (
    <div>
      <Typography variant="h2" color="textSecondary" component="p">
        Edit Home Page
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          value={homePageData.title}
          label="Title"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          name="description"
          value={homePageData.description}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default HomeDashboard;
