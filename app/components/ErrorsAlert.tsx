import { Alert, AlertTitle } from "@mui/material"

type ErrorsProps = {
  errors: [string, (Record<string, Partial<{
    type: string | number;
    message: string;
  }>> & Partial<{
    type: string | number;
    message: string;
  }>)][]
}

export default function ErrorsAlert({ errors }: ErrorsProps) {
  return errors.length <= 0
    ? null
    : (
      <Alert severity="error" sx={{ position: 'absolute', bottom: 5, left: 5 }}>
        <AlertTitle>Validation errors</AlertTitle>
        {
          errors
            .sort(([keyA], [keyB]) => {
              if (typeof keyA !== undefined && typeof keyB !== undefined) {
                return keyA.localeCompare(keyB)
              }
              return 1
            })
            .map(([key, value]) => (
              <p key={key.concat(value.message ?? '')}>
                {key}: {value.message}
              </p>
            ))
        }
      </Alert>
    )
}