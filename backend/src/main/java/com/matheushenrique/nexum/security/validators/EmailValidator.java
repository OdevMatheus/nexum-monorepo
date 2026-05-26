package com.matheushenrique.nexum.security.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import javax.naming.directory.Attributes;
import javax.naming.directory.InitialDirContext;
import java.util.Hashtable;

public class EmailValidator implements ConstraintValidator<ValidEmail, String> {

    private static final org.apache.commons.validator.routines.EmailValidator FORMAT_VALIDATOR =
            org.apache.commons.validator.routines.EmailValidator.getInstance();

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (email == null || email.isBlank()) return false;

        boolean formatValid = FORMAT_VALIDATOR.isValid(email);
        if (!formatValid) return false;

        String domain = email.substring(email.indexOf('@') + 1);
        return hasMxRecord(domain);
    }

    private boolean hasMxRecord(String domain) {
        try {
            Hashtable<String, String> env = new Hashtable<>();
            env.put("java.naming.factory.initial", "com.sun.jndi.dns.DnsContextFactory");
            env.put("java.naming.provider.url", "dns:");
            env.put("com.sun.jndi.dns.timeout.initial", "2000");
            env.put("com.sun.jndi.dns.timeout.retries", "1");

            InitialDirContext ctx = new InitialDirContext(env);
            Attributes attrs = ctx.getAttributes(domain, new String[]{"MX"});
            return attrs.get("MX") != null;
        } catch (Exception e) {
            return false;
        }
    }
}