import React, { useCallback, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { StyledString } from "next/dist/build/swc";
import { useRouter } from "next/navigation";
import { creatLinkToken } from "@/lib/actions/user.actions";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter()
  const [token, setToken] = useState('')
  
  useEffect(() => {
    const getLinkToken = async () => {
      const data = await creatLinkToken(user)
      
      setToken(data?.linkToken);
    }
    getLinkToken()
  }, [user])
  
  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    //  await exchangePulicToken({
    //   publicToken: public_token,
    //   user,
    //  })
    router.push('/')
  }, [user])
  
  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  }
  
  const { open, ready } = usePlaidLink(config) 
  
  return (
    <div>
      {variant === "primary" ? (
        <Button 
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >Connect bank primary</Button>
      ) : variant === "ghost" ? (
        <Button>Connect bank ghost</Button>
      ) : (
        <Button>Connect bank</Button>
      )}
    </div>
  );
};

export default PlaidLink;
  