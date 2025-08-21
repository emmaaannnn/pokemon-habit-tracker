from pydantic import BaseModel, Field

# Base Model
class PartyBase(BaseModel):

# Creeate
class PartyCreate(PartyBase):

# Update
class PartyUpdate(PartyBase):

# Read
class PartyRead(PartyBase):