import { useQueryAccounts } from "@/query/accounts";
import { GrabTask, SelectMode } from "@/query/grabTasks";
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

interface Props {
  value?: GrabTask;
  onChange?: (value: GrabTask) => void;
  onValidChange?: (valid: boolean) => void;
}

const GrabTaskSettings = ({ value, onChange, onValidChange }: Props) => {
  const { data: accountsData, isSuccess } = useQueryAccounts(0, 100);

  const [accounts, setAccounts] = useState<{ label: string; id: number }[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<{
    label: string;
    id: number;
  } | null>(null);

  const [taskSettings, setTaskSettings] = useState<GrabTask>({
    ntustAccountID: -1,
    enabledGrab: false,
    forceGrab: false,
    priority: 0,
    autoDisable: false,
    selectMode: 0,
  });

  const handleChange = useCallback(
    (value: GrabTask) => onChange && onChange(value),
    [onChange]
  );

  useEffect(() => {
    if (value) {
      setTaskSettings(value);
      accounts.forEach(
        (account) =>
          account.id === value.ntustAccountID && setSelectedAccount(account)
      );
    }
  }, [value, accounts]);

  useEffect(() => {
    if (isSuccess) {
      // clear array
      setAccounts([]);

      accountsData.data.forEach((account) =>
        setAccounts((prevAccounts) => [
          ...prevAccounts,
          { label: `${account.id} (${account.account})`, id: account.id! },
        ])
      );
    }
  }, [isSuccess, accountsData, setAccounts]);

  useEffect(() => {
    let valid = true;
    if (selectedAccount === null) valid = false;
    onValidChange && onValidChange(valid);
  }, [selectedAccount, taskSettings, onValidChange]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          autoHighlight
          id="account"
          options={accounts}
          renderInput={(params) => (
            <TextField {...params} label="Account" required />
          )}
          value={selectedAccount}
          onChange={(_, v) =>
            handleChange({ ...taskSettings, ntustAccountID: v?.id ? v.id : -1 })
          }
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          required
          fullWidth
          type="number"
          id="priority"
          label="Priority"
          value={value?.priority}
          onChange={(e) =>
            handleChange({
              ...taskSettings,
              priority: parseInt(e.target.value),
            })
          }
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <FormControl fullWidth>
          <InputLabel id="select-mode-label">Select Mode</InputLabel>
          <Select
            labelId="select-mode-label"
            id="select-mode"
            label="Select Mode"
            value={value?.selectMode}
            onChange={(e) =>
              handleChange({
                ...taskSettings,
                selectMode:
                  typeof e.target.value === "string"
                    ? parseInt(e.target.value)
                    : e.target.value,
              })
            }
          >
            <MenuItem value={0}>{SelectMode[0]}</MenuItem>
            <MenuItem value={1}>{SelectMode[1]}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={5}>
        <FormControlLabel
          required
          control={<Switch />}
          label="Enabled Grab"
          checked={value?.enabledGrab}
          onChange={(_, checked) =>
            handleChange({ ...taskSettings, enabledGrab: checked })
          }
        />
        <FormHelperText>Enable to grab the course</FormHelperText>
      </Grid>
      <Grid item xs={12} md={7}>
        <FormControlLabel
          required
          control={<Switch />}
          label="Force Grab"
          checked={value?.forceGrab}
          onChange={(_, checked) =>
            handleChange({ ...taskSettings, forceGrab: checked })
          }
        />
        <FormHelperText>
          Grab the course even if there is no available slot
        </FormHelperText>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          required
          control={<Switch />}
          label="Auto Disable"
          checked={value?.autoDisable}
          onChange={(_, checked) =>
            handleChange({ ...taskSettings, autoDisable: checked })
          }
        />
        <FormHelperText>
          Auto disable the task if the account already chose the course
        </FormHelperText>
      </Grid>
    </Grid>
  );
};

export default GrabTaskSettings;
