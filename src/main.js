async function getGroupRoleId(targetRole,groupId,apiKey) {
    let response = await fetch(`https://apis.roblox.com/cloud/v2/groups/${groupId}/roles?maxPageSize=20`, {
        method: "GET",
        headers: {
            "x-api-key": apiKey
        }
    });

    let data = await response.json();
    for (let role of data.groupRoles) { //check each role's ID
        if (role.rank === Number(targetRole)) { //if it's the role we want
            return Number(role.id); //return that reference
        }
    }
};

async function getUserMembershipId(targetUserId,groupId,apiKey) {
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

    let pageToken = data.nextPageToken || 1;
    let currentPage = data.groupMemberships;

    while (pageToken) {
        for (let membership of currentPage) {
            if (!membership.user || !membership.path) {continue;};

            //check to see if it's the UserId of the user we want
            let splitted = membership.user.split("/");
            let userId = splitted[splitted.length - 1];

            if (userId == targetUserId) {
                //the UserIds match! Now, return the membership ID
                let splitted = membership.path.split("/");
                let membershipId = splitted[splitted.length - 1];
                return membershipId;
            }
        }

        if (pageToken === 1) {
            pageToken = 0;
            continue;
        };

        //membership not found on this page, let's advance to the next one
        let newResponse = await fetch(`https://apis.roblox.com/cloud/v2/groups/${groupId}/memberships?maxPageSize=50&pageToken=${pageToken}`, {
            method: "GET",
            headers: {
                "x-api-key": apiKey
            }
        });

        if (!newResponse.ok) { //if it failed for whatever reason
            warn("Failed to retrieve subsequent pages. Error code:", newResponse.status);
            break;
        };

        let newData = await newResponse.json();
        pageToken = newData.nextPageToken || 1;
        currentPage = newData.groupMemberships;
    }
};

async function updateUserRole(targetRoleId, targetMembershipId,groupId,apiKey) {
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
        return "调整失败,报错:" + data.message;
    } else {
        return "调整成功，请检查群组";
    };
};


export async function updateRoleProcess(userId, roleName, groupId, apiKey) {
    if (!userId ||!roleName ||!groupId) {
        console.log('参数无效:', { userId, roleName, groupId, apiKey });
        return "调整失败,参数无效";
    }
    let roleId = await getGroupRoleId(roleName, groupId, apiKey);
    let membershipId = await getUserMembershipId(userId, groupId, apiKey);
    let g = await updateUserRole(roleId, membershipId, groupId, apiKey);
    return g;
};