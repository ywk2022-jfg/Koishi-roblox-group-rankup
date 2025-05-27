//const groupId = "32450944";
//const targetRole = ".";
//const targetUserId = "8226282544";
//const apiKey = "XfDd0uOsdEOb6n6ut/1EcEI9T25IHgI/uG+cKXqAE5fZyCo8ZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNkluTnBaeTB5TURJeExUQTNMVEV6VkRFNE9qVXhPalE1V2lJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaVlYTmxRWEJwUzJWNUlqb2lXR1pFWkRCMVQzTmtSVTlpTm00MmRYUXZNVVZqUlVrNVZESTFTVWhuU1M5MVJ5dGpTMWh4UVVVMVpscDVRMjg0SWl3aWIzZHVaWEpKWkNJNklqTXlOell3TmpNM05qRWlMQ0poZFdRaU9pSlNiMkpzYjNoSmJuUmxjbTVoYkNJc0ltbHpjeUk2SWtOc2IzVmtRWFYwYUdWdWRHbGpZWFJwYjI1VFpYSjJhV05sSWl3aVpYaHdJam94TnpRNE1qUXlNek0zTENKcFlYUWlPakUzTkRneU16ZzNNemNzSW01aVppSTZNVGMwT0RJek9EY3pOMzAuUHJtSEhuOEZRR2dVVHlCSWVGRkVLNm9meVRCTjBKRW1IMTgzSjVCQmt4djhJcTFxVV9la0diWmlnR2ViS0hOaHc4YTVuS0p4T2U2d1QzWHppNFVnMEFiRGRpZEhFZDVhUWVkSzBqRmNBMjkxNlFpcTFKc1E3dlN2cEdOc2ktSTFaaXpqdlJjdXRwQVRBb28tLWhqOG04dE1IMThXd1phYzFrcWNwUXl4VXQtRHRNN1hIYkNQZ09TN1lsT1AzWTdDV2ZxZWtBRVlKQUR2QWpCNFU3NjFRUlR1LThSRjJzbmVGemVBSDczSHlyZFl5c1NEb2NiNnR3ZXIxUzFWdHB3MkJReFdMUjhlWVVGRjFpdXJGOFphaUNOWUZVWUFfaGZUNlI4SVZ3YkFIWnNxZlhvbmVnVS05Y3FDSXUtS01UYTR6VnRfWHJMR1JsSUozdGs5TUpTZ2Vn";


async function getGroupRoleIdjson(targetRole, groupId, apiKey) {
    //send the GET request
    let response = await fetch(`https://apis.roblox.com/cloud/v2/groups/${groupId}/roles?maxPageSize=20`, {
        method: "GET",
        headers: {
            "x-api-key": apiKey
        }
    });

    let data = await response.json()

    if (response.status !== 200) {
        console.log(data.message);
    }

    for (let role of data.groupRoles) {
        if (role.displayName === targetRole) {
            return Number(role.id);
        }
    }
};

async function getUserMembershipId(targetUserId,groupId, apiKey) {
    let response = await fetch(`https://apis.roblox.com/cloud/v2/groups/${groupId}/memberships?maxPageSize=50`, {
        method: "GET",
        headers: {
            "x-api-key": apiKey
        }
    });
    console.log(response.status!==200?String(response.Status) + response.statusText:"Request ok. Code 200.");
    let data = await response.json();

    if (response.status !== 200) {
        console.log(data.message);
    };

    //don't forget you can make multiple requests and use the pageToken request parameter
    //to get pages of data after the current one!

    for (let membership of data.groupMemberships) {
        //check to see if it's the UserId of the user we want
        let splitted = membership.user.split("/");
        let userId = splitted[splitted.length - 1];
        
        if (userId == targetUserId) {
            //the UserIds match! Now, return the membership ID
            let membershipId = membership.path.split("/")[3];
            return membershipId;
        }
    }
};

async function updateUserRole(targetRoleId, targetMembershipId,groupId, apiKey) {
    let response = await fetch(`https://apis.roblox.com/cloud/v2/groups/${groupId}/memberships/${targetMembershipId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        },
        body: JSON.stringify({
            "role": `groups/${groupId}/roles/${targetRoleId}`
        })
    });

    let data = await response.json();

    if (response.status !== 200) {
        console.log(data.message);
    } else {
        console.log("Request ok. Code 200.")
    };
};

// main.js
export async function updateRoleProcess(userId, roleName, groupId, apiKey) {
    // 检查参数是否有效
    if (!userId ||!roleName ||!groupId) {
        console.log('参数无效:', { userId, roleName, groupId, apiKey });
        return;
    }
    let roleId = await getGroupRoleIdjson(roleName, groupId, apiKey);
    let membershipId = await getUserMembershipId(userId, groupId, apiKey);
    await updateUserRole(roleId, membershipId, groupId, apiKey);
    return;
};