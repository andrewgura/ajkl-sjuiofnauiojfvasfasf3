This is the repository for AAP2 rewrite. To clone this repository:

git clone https://ndpjira.faa.gov/bitbucket/scm/aap/aap-2.0.git
Use credentials for Jira/Confluence/Bitbucket

Test Account Login:

```
Email:  test.user@example.com
Password: testpassword123
```

Basic way to access User data in client components:

```
import { useAuth } from "@/hooks/useAuth";
const user = useAuth()
```