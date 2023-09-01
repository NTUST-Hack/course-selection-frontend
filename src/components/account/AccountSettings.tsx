import { useEffect, useState } from "react";
import { Account } from "@/query/accounts";
import {
  FormControlLabel,
  FormHelperText,
  Grid,
  Switch,
  TextField,
} from "@mui/material";

interface Props {
  value?: Account;
  onChange?: (value: Account) => void;
}

const AccountSettings = ({ value, onChange }: Props) => {
  const [accountSettings, setAccountSettings] = useState<Account>({
    account: "",
    secret: "",
    autoLogin: false,
  });

  useEffect(() => {
    value && setAccountSettings(value);
  }, [value]);

  const handleChange = (value: Account) => onChange && onChange(value);

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          id="account"
          label="Account"
          value={accountSettings.account}
          onChange={(e) =>
            handleChange({
              ...accountSettings,
              account: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          id="password"
          label="Password"
          type="password"
          value={accountSettings.password}
          onChange={(e) =>
            handleChange({
              ...accountSettings,
              password: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="secret"
          label="NTUST Secret"
          value={accountSettings.secret}
          onChange={(e) =>
            handleChange({
              ...accountSettings,
              secret: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControlLabel
          required
          control={<Switch />}
          label="Auto Login"
          checked={accountSettings.autoLogin}
          onChange={(_, checked) =>
            handleChange({
              ...accountSettings,
              autoLogin: checked,
            })
          }
        />
        <FormHelperText>
          Enable to keep account online and grab course
        </FormHelperText>
      </Grid>
    </Grid>
  );
};

export default AccountSettings;
