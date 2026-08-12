import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormFooter,
  Input,
  Button,
} from "@sun/components";
import { CsrfField } from "@sun/ssr/react";
import styles from "./login-form.module.css";

/**
 * Username/password form. Native POST to /__login (PRG) so the cookie sticks.
 */
const LoginForm = () => {
  const { t } = useTranslation("login");
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const redirect = searchParams.get("redirect") ?? "";

  return (
    <Form action="/__login" method="post">
      <CsrfField />
      <input type="hidden" name="redirect" value={redirect} />
      <FormField name="username">
        <FormLabel>{t("username")}</FormLabel>
        <FormItem>
          <Input
            type="text"
            placeholder={t("username-placeholder")}
            autoComplete="username"
            required
            autoFocus
          />
        </FormItem>
      </FormField>
      <FormField name="password">
        <FormLabel>{t("password")}</FormLabel>
        <FormItem>
          <Input
            type="password"
            placeholder={t("password-placeholder")}
            autoComplete="current-password"
            required
          />
        </FormItem>
      </FormField>
      {error && <p className={styles.error}>{t("error-default")}</p>}
      <FormFooter>
        <Button type="submit" title={t("sign-in-title")}>
          {t("sign-in-label")}
        </Button>
      </FormFooter>
    </Form>
  );
};

export default LoginForm;
